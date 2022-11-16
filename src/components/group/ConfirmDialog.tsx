import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'
import { RefObject } from 'react'
import { User } from '@/types/user'

type Props = {
  user: User
  isOpen: boolean
  onClose: () => void
  cancelRef: RefObject<HTMLButtonElement>
  situation: 'add' | 'delete'
  handleEdit: (userId: number) => void
}

export const ConfirmDialog: React.FC<Props> = ({
  user,
  isOpen,
  onClose,
  cancelRef,
  situation,
  handleEdit,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {situation === 'add'
              ? `${user.name}をグループに追加します`
              : `${user.name}をグループから削除します`}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button onClick={() => handleEdit(user.id)}>
              {situation === 'add' ? '追加' : '削除'}する
            </Button>
            <Button ref={cancelRef} colorScheme="teal" onClick={onClose} ml={3}>
              戻る
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
