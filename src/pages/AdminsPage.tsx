import { useState } from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'

import { useQuery } from "@tanstack/react-query"
import { getAdmins } from "../api/AdminApi"

import BaseLayout from '../layouts/BaseLayout'

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
    <BaseLayout>
      <TableContainer
        p = {4}
        mt = "10"
        mx = "auto"
        bg = "foreground"
        rounded = "lg"
        w = {{base: "100%", md: "90%", lg: "80%"}}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th textAlign='center'>First Name</Th>
              <Th textAlign='center'>Last Name</Th>
              <Th textAlign='center'>Email</Th>
              <Th textAlign='center'>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.map((admin : {first_name: string, last_name: string, email: string}, index: number) => (
              <Tr key={index}>
                <Td p = {1} textAlign='center'>{admin.first_name}</Td>
                <Td p = {1} textAlign='center'>{admin.last_name}</Td>
                <Td p = {1} textAlign='center'>{admin.email}</Td>
                <Td p = {1} textAlign='center'>
                  <IconButton title = "Edit" aria-label = "edit" icon={<MdEdit/>} bg="none" onClick = {() => handleClick(admin)}/>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AdminEditModal isOpen = {isOpen} onClose = {onClose} dataItem = {dataItem}/>
    </BaseLayout>
  )
}
