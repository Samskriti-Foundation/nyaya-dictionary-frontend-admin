import { useQuery } from "@tanstack/react-query"
import { getWords } from "../../api/WordApi"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer
} from "@chakra-ui/react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"

const defaultColumns = [
  {
    accessorKey: 'sanskrit_word',
    header: 'Sanskrit',
  },
  {
    accessorKey: 'english_transliteration',
    header: 'Transliteration',
  },
  {
    accessorKey: 'meaning_ids',
    header: 'No of Meanings',
    cell: (info: any) => info.getValue().length
  },
]

export default function WordsTable({searchTermOut}: {searchTermOut: string}) {
  const {data} = useQuery({
    queryKey: ["words"],
    queryFn: () => getWords(),
  })

  const navigate = useNavigate()

  const columns = useMemo(() => defaultColumns, [])
  const [globalFilter, setGlobalFilter] = useState('')
  const debounceSearch = useDebounce(searchTermOut, 300)
  
  useEffect(() => {
    setGlobalFilter(debounceSearch)
  }, [debounceSearch])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <TableContainer bg = "foreground" boxShadow = "lg" rounded = "md">
      <Table variant="striped">
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  }
              </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data && table.getRowModel().rows.map(row => (
            <Tr key={row.id} onClick = {() => navigate(`/words/${row.original.sanskrit_word}`)} _hover = {{cursor: "pointer", bg: "#E2E8F0"}}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}