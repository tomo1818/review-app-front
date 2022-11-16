import { SettingsIcon } from '@chakra-ui/icons'
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AddUserModal } from './AddUserModal'
import { addUserToGroup, deleteUserFromGroup } from '@/lib/api/userGroup'
import { Group } from '@/types/group'

type Props = {
  groups: Group[]
  setGroups: (value: Group[]) => void
  handleDelete: (id: number) => void
  onOpen: (name: string, id: number) => void
}

export const GroupsView: React.FC<Props> = ({
  groups,
  setGroups,
  handleDelete,
  onOpen,
}) => {
  const { isOpen, onOpen: onAddUserModalOpen, onClose } = useDisclosure()
  const [group, setGroup] = useState<Group>()

  const handleOpen = (value: Group) => {
    setGroup(value)
    onAddUserModalOpen()
  }

  const handleAddUser = async (groupId: number, userId: number) => {
    try {
      const res = await addUserToGroup({ userId: userId, groupId: groupId })
      setGroups(
        groups.map((group) => (group.id === groupId ? res.data : group)),
      )
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteUser = async (groupId: number, userId: number) => {
    try {
      const res = await deleteUserFromGroup(groupId, userId)
      setGroups(
        groups.map((group) => (group.id === res.data.id ? res.data : group)),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (groups) {
      setGroup(groups[0])
    }
  }, [groups])

  return (
    <>
      <div css={wrapper}>
        {groups.map((group, index) => (
          <div css={content} key={index}>
            <Text color="blackAlpha.900" size="md" fontWeight="bold">
              {group.name}
            </Text>
            <div css={linkContents}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<SettingsIcon />}
                  variant="outline"
                  background="gray.100"
                  _hover={{ bg: 'gray.200' }}
                />
                <MenuList>
                  <MenuItem onClick={() => onOpen(group.name, group.id)}>
                    グループを編集する
                  </MenuItem>
                  <MenuItem onClick={() => handleOpen(group)}>
                    ユーザーを追加する
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(group.id)}>
                    削除する
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button>
                <Link href={`/group/${group.id}`}>詳細を見る</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {group && (
        <AddUserModal
          isOpen={isOpen}
          onClose={onClose}
          group={group}
          addUser={handleAddUser}
          deleteUser={deleteUser}
        />
      )}
    </>
  )
}

const wrapper = css`
  display: grid;
  max-width: 760px;
  margin: 0 auto;
  row-gap: 30px;
`

const content = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const linkContents = css`
  display: flex;
  align-items: center;
  gap: 10px;
`
