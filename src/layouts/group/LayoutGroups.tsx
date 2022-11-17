import { Heading, Button, useDisclosure } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GroupsView } from '@/components/group/GroupsView'
import { GroupModal } from '@/components/group/Modal'
import { Container } from '@/components/utils/Container'
import { Spacer } from '@/components/utils/Spacer'
import { useDevice } from '@/hooks/use-device'
import { createGroup, deleteGroup, updateGroup } from '@/lib/api/group'
import { Group, GroupParams } from '@/types/group'
import { User } from '@/types/user'

type Props = {
  user: User
  groups: Group[]
  setGroups: (value: Group[]) => void
}

export const LayoutGroups: React.FC<Props> = ({ groups, setGroups, user }) => {
  const { isMobile } = useDevice()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editGroupId, setIsEditGroupId] = useState(0)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupParams>({
    defaultValues: {
      name: '',
    },
  })

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure()
  const {
    register: editRegister,
    handleSubmit: onEdit,
    reset: resetEditData,
    setValue,
    formState: { errors: editErrors },
  } = useForm<GroupParams>({
    defaultValues: {
      name: '',
    },
  })

  const handleOpen = (name: string, id: number) => {
    setValue('name', name)
    setIsEditGroupId(id)
    onEditModalOpen()
  }

  const handleEdit = onEdit(async (data) => {
    try {
      const res = await updateGroup(editGroupId, data)
      setGroups(
        groups.map((group) => (group.id === editGroupId ? res.data : group)),
      )
      onEditModalClose()
      resetEditData()
    } catch (e) {
      console.log(e)
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await createGroup(data)
      setGroups([...groups, res.data])
      onClose()
      reset()
    } catch (e) {
      console.log(e)
    }
  })

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteGroup(id)
      console.log('delete group', res.data)
      setGroups(groups.filter((group) => group.id !== id))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <div css={headingWrapper}>
        <Heading size={isMobile ? 'xl' : '2xl'}>グループ一覧</Heading>
        <div css={buttonWrapper}>
          <Button
            size={isMobile ? 'sm' : 'md'}
            variant="solid"
            colorScheme="teal"
            onClick={onOpen}
          >
            追加する
          </Button>
        </div>
      </div>
      <Spacer size={isMobile ? 20 : 40} />

      <GroupsView
        groups={groups}
        setGroups={setGroups}
        handleDelete={handleDelete}
        onOpen={handleOpen}
        user={user}
      />

      <GroupModal
        handleSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
        register={register}
        errors={errors}
      />
      <GroupModal
        handleSubmit={handleEdit}
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        register={editRegister}
        errors={editErrors}
        isEdit={true}
      />
    </Container>
  )
}

const headingWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const buttonWrapper = css`
  display: flex;
  gap: 15px;
`
