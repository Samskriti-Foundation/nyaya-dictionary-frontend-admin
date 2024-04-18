import { useGetWordsQuery } from "../../api/words.api"
import { useNavigate } from "react-router-dom"

import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
} from "@chakra-ui/react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import LoadingSpinner from "../LoadingSpinner"
import ErrorMessage from "../ErrorMessage"

const defaultColumns = [
  {
    accessorKey: "sanskrit_word",
    header: "Sanskrit",
  },
  {
    accessorKey: "english_transliteration",
    header: "Transliteration",
  },
  {
    accessorKey: "meaning_ids",
    header: "No of Meanings",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: any) => info.getValue()?.length,
  },
]

export default function WordsTable({
  searchTermOut,
}: {
  searchTermOut: string
}) {
  const { isLoading, error, data } = useGetWordsQuery()

  const navigate = useNavigate()

  const columns = useMemo(() => defaultColumns, [])
  const [globalFilter, setGlobalFilter] = useState("")
  const debounceSearch = useDebounce(searchTermOut, 300)

  useEffect(() => {
    setGlobalFilter(debounceSearch)
  }, [debounceSearch])

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  isLoading && <LoadingSpinner />

  error && <ErrorMessage error={error?.message} />

  return (
    <TableContainer bg="foreground" boxShadow="lg" rounded="md">
      <Table variant="simple">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data &&
            table.getRowModel().rows.map((row, index) => (
              <Tr
                key={row.id}
                onClick={() => navigate(`/words/${row.original.sanskrit_word}`)}
                _hover={{ cursor: "pointer", bg: "gray.200" }}
                bg={index % 2 === 0 ? "gray.100" : "white"}
              >
                {row.getVisibleCells().map((cell) => (
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
