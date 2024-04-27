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
} from "@tanstack/react-table"

import {
  MdChevronLeft,
  MdChevronRight,
  MdDelete,
  MdEdit,
  MdFirstPage,
  MdLastPage,
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
  Box,
  Flex,
  Checkbox,
  Button,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberDecrementStepper,
} from "@chakra-ui/react"

import { useGetDBManagersQuery } from "../../api/dbmanagers.api"
import { useState } from "react"
import LoadingSpinner from "../LoadingSpinner"
import ErrorMessage from "../ErrorMessage"
import AddDBManagerModal from "./AddDBManagerModal"
import EditDBManagerModal from "./EditDBManagerModal"
import DeleteDBManagerModal from "./DeleteDBManagerModal"

type TDBManager = {
  first_name: string
  last_name: string
  email: string
  role: string
  access: string
}
export default function DBManagersTable() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()

  const { data, isLoading, error } = useGetDBManagersQuery()

  const [selectedDBManager, setSelectedDBManager] = useState<TDBManager>({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    access: "",
  })

  {
    isLoading && <LoadingSpinner />
    error && <ErrorMessage error={error.message} />
  }

  const [columns] = useState<ColumnDef<TDBManager>[]>([
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (info) => info.getValue(),
    },
    {
      header: "Access",
      accessorKey: "access",
      cell: (info) => info.getValue(),
    },
    {
      header: "Actions",
      id: "actions",
      cell: (info) => {
        return (
          <Flex gap="2" justifyContent="center">
            <IconButton
              aria-label="Edit DB Manager"
              icon={<MdEdit />}
              size="sm"
              fontSize="xl"
              variant="outline"
              colorScheme="black"
              onClick={() => {
                setSelectedDBManager(info.row.original)
                onEditOpen()
              }}
              title="Edit DB Manager"
            />
            <IconButton
              aria-label="Delete DB Manager"
              icon={<MdDelete />}
              size="sm"
              fontSize="xl"
              variant="outline"
              colorScheme="red"
              onClick={onDeleteOpen}
              title="Delete DB Manager"
            />
          </Flex>
        )
      },
    },
  ])

  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      pagination,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  })

  return (
    <Box w="100%" h="100%" p="4">
      <Flex justifyContent="center" gap="4" p="4">
        <InputGroup
          w="lg"
          bg="foreground"
          boxShadow="md"
          rounded="md"
          maxW="80%"
        >
          <Input
            onChange={(e) => setGlobalFilter(e.target.value)}
            outline="none"
            placeholder="Search"
            _focus={{ borderColor: "tertiary.400" }}
            _hover={{ borderColor: "tertiary.500" }}
          />
          <InputRightElement>
            <FaSearch opacity="0.5" />
          </InputRightElement>
        </InputGroup>
        <Popover>
          <PopoverTrigger>
            <Button
              bg="tertiary.400"
              color="foreground"
              boxShadow="md"
              _hover={{ bg: "tertiary.500" }}
            >
              Options
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Toggle Columns</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                <Checkbox
                  isChecked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                  _checked={{
                    "& .chakra-checkbox__control": {
                      background: "secondary.400",
                      borderColor: "secondary.400",
                    },
                  }}
                >
                  Toggle All
                </Checkbox>
              </Box>
              {table.getAllLeafColumns().map((column) => (
                <Box key={column.id}>
                  <Checkbox
                    isChecked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    _checked={{
                      "& .chakra-checkbox__control": {
                        background: "secondary.400",
                        borderColor: "secondary.400",
                      },
                    }}
                  >
                    {" "}
                    {`${column.columnDef.header}`}{" "}
                  </Checkbox>
                </Box>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Button
          bg="tertiary.400"
          color="background"
          _hover={{ bg: "tertiary.500" }}
          boxShadow="md"
          onClick={onOpen}
        >
          Add DB Manager
        </Button>
      </Flex>
      <TableContainer
        bg="foreground"
        boxShadow="md"
        rounded="md"
        maxW="80%"
        mx="auto"
      >
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      <AddDBManagerModal isOpen={isOpen} onClose={onClose} />
      <EditDBManagerModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        DBManager={{
          firstName: selectedDBManager.first_name,
          lastName: selectedDBManager.last_name,
          ...selectedDBManager,
        }}
      />
      <DeleteDBManagerModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        name={selectedDBManager.first_name + " " + selectedDBManager.last_name}
        email={selectedDBManager.email}
      />
    </Box>
  )
}
