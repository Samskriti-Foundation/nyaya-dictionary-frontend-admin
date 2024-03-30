import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  List,
  ListItem,
  Flex,
  Text,
  Wrap,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Button,
  Checkbox,
  
} from "@chakra-ui/react"

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  ColumnOrderState,
  SortingState
} from '@tanstack/react-table'

import {useMemo, useState} from "react"
import { getWords } from "../../api/WordApi"
import { useQuery } from "@tanstack/react-query"

import { 
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaDownAlt 
} from "react-icons/fa";

export default function DictionaryTable() {
  const {data} = useQuery({
    queryKey: ["words"],
    queryFn: getWords
  })

  const columns = useMemo(() => [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Word",
      accessorKey: "sanskrit_word",
    },
    {
      header: "Transliteration",
      accessorKey: "english_word",
    },
    {
      header: "Etymology",
      accessorKey: "etymologies",
      cell: ({getValue}: any) => (
        <List spacing = {3}>
          {getValue().map((value: string) => (
            <ListItem key={value}>{value}</ListItem>
          ))}
        </List>
      ) 
    },
    {
      header: "Derivations",
      accessorKey: "derivations",
      cell: ({getValue}: any) => (
        <List spacing = {3}>
          {getValue().map((value: string) => (
            <ListItem key={value}>{value}</ListItem>
          ))}
        </List>
      )
    },
    {
      header: "Translation",
      accessorKey: "translations",
      cell: ({ getValue }: any) => (
        <Table variant="striped" textAlign="center">
          <Thead>
            <Tr>
              <Th>Language</Th>
              <Th>Translation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getValue() && Object.keys(getValue()).map((key, i) => (
              <Tr key={i}>
                <Td>{key}</Td>
                <Td>
                  <Flex gap={2}>
                    {getValue()[key].map((translation, j) => (
                      <Text key={j}>{translation}</Text>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )
    },
    {
      header: "Detailed Description",
      accessorKey: "description",
    },
    {
      header: "Nyaya Text References",
      accessorKey: "reference_nyaya_texts",
    },
    {
      header: "Synonyms",
      accessorKey: "synonyms",
      cell: ({getValue}: any) => (
        <Wrap gap = "3">
          {getValue().map((value: string) => (
            <Text key={value}>{value}</Text>
          ))}
        </Wrap>
      )
    },
    {
      header: "Antonyms",
      accessorKey: "antonyms",
      cell: ({getValue}: any) => (
        <Wrap gap = "3">
          {getValue().map((value: string) => (
            <Text key={value}>{value}</Text>
          ))}
        </Wrap>
      )
    },
  ], [])

  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      sorting,
      globalFilter
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <Box w = "100%" h = "100%" p = "4">
      <Flex justifyContent= "center" gap = "4" p = "4">
        <InputGroup w = "lg" bg = "foreground" boxShadow = "md" rounded = "md" maxW = "80%" >
        <Input
          onChange = {(e) => setGlobalFilter(e.target.value)}
          outline = "none"
          placeholder = "Search"
          _focus = {{borderColor: "primary"}}
          _hover = {{borderColor: "secondary"}}/>
        <InputRightElement><FaSearch opacity = "0.5"/></InputRightElement>
        </InputGroup>
        <Popover>
          <PopoverTrigger>
            <Button bg = "tertiary" color = "foreground" boxShadow = "md" _hover = {{bg: "secondary"}}>Options</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Toggle Columns</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                <Checkbox isChecked = {table.getIsAllColumnsVisible()} onChange = {table.getToggleAllColumnsVisibilityHandler()} _checked={{
        "& .chakra-checkbox__control": { background: "secondary", borderColor: "secondary" }}} _hover = {{"& .chakra-checkbox__control": { background: "primary", borderColor: "primary"}}}>Toggle All</Checkbox>
              </Box>
              {table.getAllLeafColumns().map(column => (
                <Box key = {column.id}>
                  <Checkbox isChecked = {column.getIsVisible()} onChange = {column.getToggleVisibilityHandler()} _checked={{
        "& .chakra-checkbox__control": { background: "secondary", borderColor: "secondary" }}} _hover = {{"& .chakra-checkbox__control": { background: "primary", borderColor: "primary"}}}> {`${column.columnDef.header}`} </Checkbox>
                </Box>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <TableContainer bg = "foreground" boxShadow = "md" rounded = "md" maxW = "80%" mx = "auto" overflow = "scroll">
        <Table variant = "striped">
          <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                  <Th key = {header.id} colSpan = {header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : 
                      <Flex gap = "2" align = "center"
                        className={ header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
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
                          asc: <FaSortAlphaDown/>,
                          desc: <FaSortAlphaDownAlt/>,
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    }
                  </Th>
                ))}
            </Tr>
          ))}
          </Thead>
          <Tbody>
            {data && table.getRowModel().rows.map(row => (
              <Tr key={row.id}>
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
    </Box>
  )
}
