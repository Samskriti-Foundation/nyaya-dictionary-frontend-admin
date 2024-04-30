import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  ColumnOrderState,
  SortingState,
  getPaginationRowModel,
  PaginationState,
  ColumnFiltersState,
} from "@tanstack/react-table"
import { useState } from "react"

import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
  MdFilterList,
} from "react-icons/md"

import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa"

import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  IconButton,
  Select,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberDecrementStepper,
  InputGroup,
  Input,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  FormControl,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormLabel,
} from "@chakra-ui/react"

import { useGetAuthLogsQuery } from "../../api/logs.api"

function getFormattedMonth(date: Date) {
  const months = [
    "01_Jan",
    "02_Feb",
    "03_Mar",
    "04_Apr",
    "05_May",
    "06_Jun",
    "07_Jul",
    "08_Aug",
    "09_Sep",
    "10_Oct",
    "11_Nov",
    "12_Dec",
  ]
  return months[date.getMonth()]
}

type TAuthLog = {
  timestamp: string
  client_ip: string
  db_manager_email: string
}

export default function LoginAuditsTable() {
  const [columns] = useState<ColumnDef<TAuthLog>[]>([
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: (info) => {
        const dateTimeString = `${info.getValue()}`
        const dateTime = new Date(dateTimeString)
        const formattedDateTime = dateTime.toLocaleString()
        return formattedDateTime
      },
    },
    {
      accessorKey: "client_ip",
      header: "Client IP",
    },
    {
      accessorKey: "db_manager_email",
      header: "DB Manager Email",
    },
  ])

  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const currentDate = new Date()
  const formattedMonth = getFormattedMonth(currentDate)
  const [month, setMonth] = useState(formattedMonth)
  const { data } = useGetAuthLogsQuery()

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      pagination,
      globalFilter,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ textAlign: "center" }}
                >
                  {header.isPlaceholder ? null : (
                    <Flex
                      justifyContent="center"
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortAlphaDown />,
                        desc: <FaSortAlphaDownAlt />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data &&
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} style={{ textAlign: "center" }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
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
            {[5, 10, 15, 20].map((pageSize) => (
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
