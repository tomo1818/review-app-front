import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { Thumbnail } from '../utils/Thumbnail'
import { CategoryParams } from '@/types/category'

type Props = {
  defaultImage?: string
  handleSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>
  isOpen: boolean
  onClose: () => void
  isEdit?: boolean
  register: UseFormRegister<CategoryParams>
  errors: Partial<FieldErrorsImpl<CategoryParams>>
  setValue: (
    name: 'name' | 'groupId' | 'thumbnail',
    value: string | File,
  ) => void
}

export const CategoryModal: React.FC<Props> = ({
  defaultImage,
  handleSubmit,
  isOpen,
  onClose,
  isEdit = false,
  register,
  errors,
  setValue,
}) => {
  const [preview, setPreview] = useState(defaultImage)
  const previewImage = useCallback((file: File) => {
    if (file) setPreview(window.URL.createObjectURL(file))
    else setPreview('')
  }, [])
  const inputRef = useRef<HTMLInputElement>(null)

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
                <FormLabel>カテゴリー名</FormLabel>
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
              <FormControl id="thumbnail">
                <FormLabel>カテゴリー名</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  {...register('thumbnail', {
                    onChange: (e) => {
                      setValue('thumbnail', e.target.files![0])
                      previewImage(e.target.files![0])
                    },
                  })}
                  ref={inputRef}
                />
              </FormControl>
              {preview && (
                <Box
                  css={imageStyle}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Thumbnail src={preview} width={300} layout="square" />
                </Box>
              )}
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

const imageStyle = css`
  img {
    max-height: 300px;
    margin: 0 auto;
  }
`

const error = css`
  color: #c22929;
`
