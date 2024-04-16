import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  ColumnOrderState,
  SortingState,
} from "@tanstack/react-table"

import { MdEdit } from "react-icons/md"
import { FaSearch, FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa"

import {
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
} from "@chakra-ui/react"

import { getAdmins } from "../../api/admin.api"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import AdminEditModal from "./AdminEditModal"
import { Admin } from "../../types"

export default function AdminTable() {
  const { data } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [columns] = useState<ColumnDef<Admin>[]>([
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
    // {
    //   header: "Created At",
    //   accessorKey: "created_at",
    // },
    // {
    //   header: "Last Login",
    //   accessorKey: "last_login",
    // },
  ])

  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
  })

  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)

  const handleEditClick = (admin: Admin) => {
    setSelectedAdmin(admin)
    onOpen()
  }

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
            _focus={{ borderColor: "primary" }}
            _hover={{ borderColor: "secondary" }}
          />
          <InputRightElement>
            <FaSearch opacity="0.5" />
          </InputRightElement>
        </InputGroup>
        <Popover>
          <PopoverTrigger>
            <Button
              bg="tertiary"
              color="foreground"
              boxShadow="md"
              _hover={{ bg: "secondary" }}
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
                      background: "secondary",
                      borderColor: "secondary",
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
                        background: "secondary",
                        borderColor: "secondary",
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
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <Flex
                        gap="2"
                        align="center"
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        // title={
                        //   header.column.getCanSort()
                        //     ? header.column.getNextSortingOrder() === 'asc'
                        //       ? 'Sort ascending'
                        //       : header.column.getNextSortingOrder() === 'desc'
                        //       ? 'Sort descending'
                        //       : 'Clear sort'
                        //     : undefined
                        // }
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
                <Th>Actions</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {data &&
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<MdEdit />}
                      onClick={() => handleEditClick(row.original)}
                      bg="none"
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedAdmin && (
        <AdminEditModal
          isOpen={isOpen}
          onClose={onClose}
          dataItem={selectedAdmin}
        />
      )}
    </Box>
  )
}
