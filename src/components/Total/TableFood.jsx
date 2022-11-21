import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import FoodMealName from '../Food/FoodMealName';

const TableFood = () => {
  return (
    <TableContainer>
              <Table size="sm" variant="striped" colorScheme="teal">
                <Thead>
                  <Tr><FoodMealName name={name} /></Tr>
                  <Tr>
                    <Th>Nom</Th>
                    <Th textAlign="center">Proteines</Th>
                    <Th textAlign="center">Glucides</Th>
                    <Th textAlign="center">Lipides</Th>
                    <Th textAlign="center">Qt</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td textAlign="center">millimetres (mm)</Td>
                    <Td textAlign="center">25.4</Td>
                    <Td textAlign="center">25.4</Td>
                    <Td textAlign="center">25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>inches</Td>
                    <Td textAlign="center">millimetres (mm)</Td>
                    <Td textAlign="center">25.4</Td>
                  </Tr>

                </Tbody>
                {/* <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Tfoot> */}
              </Table>
            </TableContainer>
  )
}

export default TableFood