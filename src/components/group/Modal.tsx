import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { BaseSyntheticEvent } from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { GroupParams } from '@/types/group'

type Props = {
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>
  isOpen: boolean
  onClose: () => void
  isEdit?: boolean
  register: UseFormRegister<GroupParams>
  errors: Partial<FieldErrorsImpl<GroupParams>>
}

export const GroupModal: React.FC<Props> = ({
  handleSubmit,
  isOpen,
  onClose,
  isEdit = false,
  register,
  errors,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          カテゴリーを{isEdit ? '更新する' : '追加する'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex align={'center'}>
            <Stack spacing={4} width="100%">
              <FormControl id="name" isRequired>
                <FormLabel>グループ名</FormLabel>
                <Input
                  type="text"
                  {...register('name', {
                    required: {
                      value: true,
                      message: '入力が必須の項目です。',
                    },
                    maxLength: {
                      value: 20,
                      message: '20文字以内で入力してください。',
                    },
                  })}
                />
                {errors?.name && <p css={error}>{errors.name.message}</p>}
              </FormControl>
            </Stack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            {isEdit ? '更新する' : '追加する'}
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            戻る
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const error = css`
  color: #c22929;
`
