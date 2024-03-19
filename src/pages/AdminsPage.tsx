import { useState } from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'

import { useQuery } from "@tanstack/react-query"
import { getAdmins } from "../api/AdminApi"
import Navbar from "../components/Navbar/Navbar"

import { MdEdit } from "react-icons/md"
import AdminEditModal from '../components/Modal/AdminEditModal'


export default function AdminsPage() {
  const {data} = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  })

  const {isOpen, onOpen, onClose} = useDisclosure()

  const [dataItem, setDataItem] = useState({first_name: "", last_name: "", email: ""})
  
  const handleClick = (data: {first_name: string, last_name: string, email: string}) => {
    setDataItem(data)
    onOpen()
  }

  return (
    <Box h = "full" bg = "primary.300">
      <Navbar />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.map((admin : {first_name: string, last_name: string, email: string}, index: number) => (
              <Tr key={index} p = {0}>
                <Td>{admin.first_name}</Td>
                <Td>{admin.last_name}</Td>
                <Td>{admin.email}</Td>
                <Td><IconButton aria-label = "edit" icon={<MdEdit/>} bg="none" onClick = {() => handleClick(admin)}/></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AdminEditModal isOpen = {isOpen} onClose = {onClose} dataItem = {dataItem}/>
    </Box>
  )
}
