import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useRef, useState } from 'react'
import { Spacer } from '../utils/Spacer'
import { ConfirmDialog } from './ConfirmDialog'
import { getUsers } from '@/lib/api/user'
import { Group } from '@/types/group'
import { User } from '@/types/user'

type Props = {
  isOpen: boolean
  onClose: () => void
  addUser: (groupId: number, userId: number) => void
  deleteUser: (groupId: number, userId: number) => void
  group: Group
}

export const AddUserModal: React.FC<Props> = ({
  isOpen,
  onClose,
  addUser,
  deleteUser,
  group,
}) => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<User>()
  const [users, setUsers] = useState<User[]>()
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const searchUserByName = async () => {
    try {
      const res = await getUsers(userName, group.id)
      setUsers(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddUser = (userId: number) => {
    addUser(group.id, userId)
    setUserName('')
    setUsers([])
    onAddModalClose()
  }
  const handleDeleteUser = (userId: number) => {
    deleteUser(group.id, userId)
    onDeleteModalClose()
  }

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ユーザーを追加する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align={'center'}>
              <Stack spacing={2} width="100%">
                <FormControl id="tags">
                  <FormLabel>ユーザー一覧</FormLabel>
                  <Box display="flex" gap={2}>
                    <Input
                      type="text"
                      value={userName}
                      name="tags"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <IconButton
                      aria-label="search user"
                      size="md"
                      icon={<SearchIcon />}
                      onClick={() => searchUserByName()}
                      disabled={userName.length === 0}
                    />
                  </Box>
                  {users && (
                    <>
                      <Spacer size={20} />
                      {users.length > 0 ? (
                        <Box
                          borderWidth="1px"
                          borderColor="gray.200"
                          borderRadius={5}
                          overflowY="auto"
                          maxHeight="120px"
                        >
                          {users.map((user, index) => (
                            <Button
                              key={index}
                              colorScheme="gray"
                              variant="ghost"
                              width="100%"
                              justifyContent="flex-start"
                              borderRadius={0}
                              onClick={() => {
                                setUser(user)
                                onAddModalOpen()
                              }}
                            >
                              {user.name}
                            </Button>
                          ))}
                        </Box>
                      ) : (
                        <Text>0件</Text>
                      )}
                    </>
                  )}

                  <Spacer size={20} />
                  <div css={tagWrapper}>
                    {group.users.map((user, index) => (
                      <Tag key={index} paddingRight={0}>
                        <Text paddingRight={1}>{user.name}</Text>
                        <IconButton
                          aria-label="delete tag"
                          size="xs"
                          icon={<CloseIcon />}
                          onClick={() => {
                            setUser(user)
                            onDeleteModalOpen()
                          }}
                        />
                      </Tag>
                    ))}
                  </div>
                </FormControl>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              戻る
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {user && (
        <ConfirmDialog
          user={user}
          isOpen={isAddModalOpen}
          onClose={onAddModalClose}
          cancelRef={cancelRef}
          situation="add"
          handleEdit={handleAddUser}
        />
      )}
      {user && (
        <ConfirmDialog
          user={user}
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          cancelRef={cancelRef}
          situation="delete"
          handleEdit={handleDeleteUser}
        />
      )}
    </>
  )
}

const tagWrapper = css`
  display: flex;
  gap: 10px;
`
