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
  Flex,
  IconButton,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Heading,
} from "@chakra-ui/react"

import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import LoadingSpinner from "../LoadingSpinner"
import BeatLoader from "react-spinners/BeatLoader"
import ErrorMessage from "../ErrorMessage"
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md"

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

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const debounceSearch = useDebounce(searchTermOut, 300)

  useEffect(() => {
    setGlobalFilter(debounceSearch)
  }, [debounceSearch])

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  })

  isLoading && <LoadingSpinner />

  error && <ErrorMessage error={error?.message} />

  return (
    <TableContainer bg="foreground" boxShadow="lg" rounded="md">
      {data ? (
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
            {table.getRowModel().rows.map((row, index) => (
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
      ) : (
        <Heading textAlign="center" p="2">
          Please wait, loading data <BeatLoader size={8} />
        </Heading>
      )}
      <Flex justifyContent="center" alignItems="center" gap="4" my="4">
        <Flex gap="2">
          <IconButton
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            aria-label="go to first page"
            title={
              !table.getCanPreviousPage()
                ? "Already in first page"
                : "Go to first page"
            }
            icon={<MdFirstPage />}
          />
          <IconButton
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            aria-label="go to previous page"
            title={
              !table.getCanPreviousPage()
                ? "Already in first page"
                : "Go to previous page"
            }
            icon={<MdChevronLeft />}
          />
          <IconButton
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            aria-label="go to next page"
            title={
              !table.getCanNextPage()
                ? "Already in last page"
                : "Go to next page"
            }
            icon={<MdChevronRight />}
          />
          <IconButton
            onClick={() => table.lastPage()}
            isDisabled={!table.getCanNextPage()}
            aria-label="go to last page"
            title={
              !table.getCanNextPage()
                ? "Already in last page"
                : "Go to last page"
            }
            icon={<MdLastPage />}
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="2">
          <Text>
            Page <b>{table.getState().pagination.pageIndex + 1}</b> of{" "}
            <b>{table.getPageCount()}</b>
          </Text>
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 8, 10, 12, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex justifyContent="center" alignItems="center" gap="1">
          <Text>Go to page: </Text>
          <NumberInput
            defaultValue={table.getState().pagination.pageIndex + 1}
            min={1}
            max={table.getPageCount()}
            display="inline"
            w="72px"
            onChange={(value) => {
              const page = value ? Number(value) - 1 : 0
              table.setPageIndex(page)
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>
    </TableContainer>
  )
}
