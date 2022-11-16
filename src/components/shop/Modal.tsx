import { AddIcon, CloseIcon } from '@chakra-ui/icons'
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
  Checkbox,
  IconButton,
  Tag,
  Text,
  Box,
  Textarea,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { BaseSyntheticEvent, useMemo, useState } from 'react'
import {
  Control,
  FieldErrorsImpl,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import { Spacer } from '../utils/Spacer'
import { ShopParams } from '@/types/shop'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>
  register: UseFormRegister<ShopParams>
  setValue: UseFormSetValue<ShopParams>
  getValues: UseFormGetValues<ShopParams>
  control: Control<ShopParams, any>
  errors: Partial<
    FieldErrorsImpl<{
      name: string
      groupId: number
      categoryId: number
      avgScore: number
      done: boolean
      visitDay: string
      tagString: string
      url: string
      description: string
    }>
  >
  isEdit?: boolean
}

export const ShopModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  setValue,
  getValues,
  control,
  errors,
  isEdit = false,
}) => {
  const [tagName, setTagName] = useState('')

  const [isDone, setIsDone] = useState(getValues('done'))
  const tagString = useWatch({
    control,
    name: 'tagString',
  })

  const tags = useMemo(() => {
    if (tagString.indexOf(',') === -1) return [tagString]
    return tagString.split(',')
  }, [tagString])

  const addTags = (val: string) => {
    if (tagName !== '') {
      const value = tagString === '' ? val : tagString + ',' + val
      setValue('tagString', value)
      setTagName('')
    }
  }

  const deleteTags = (value: string) => {
    if (tags.length == 1) {
      setValue('tagString', '')
    } else {
      const newTags = tags.filter((tag) => tag !== value).join(',')
      setValue('tagString', newTags)
    }
  }

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shopを追加する</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex align={'center'}>
            <Stack spacing={2} width="100%">
              <FormControl id="name" isRequired>
                <FormLabel>ショップ名</FormLabel>
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
              <FormControl id="description" isRequired>
                <FormLabel>詳細</FormLabel>
                <Textarea
                  rows={7}
                  {...register('description', {
                    required: {
                      value: true,
                      message: '入力が必須の項目です。',
                    },
                    maxLength: {
                      value: 200,
                      message: '200文字以内で入力してください。',
                    },
                  })}
                />
                {errors?.description && (
                  <p css={error}>{errors.description.message}</p>
                )}
              </FormControl>
              <FormControl id="url">
                <FormLabel>参考URL</FormLabel>
                <Input
                  type="text"
                  {...register('url', {
                    pattern: {
                      // eslint-disable-next-line no-useless-escape
                      value: /^(https?|ftp)(:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+)/,
                      message: '有効なURLを記入してください',
                    },
                  })}
                />
                {errors?.url && <p css={error}>{errors.url.message}</p>}
              </FormControl>
              <FormControl id="done">
                <Checkbox
                  {...register('done', {
                    onChange: (e) => setIsDone(e.target.checked),
                  })}
                >
                  訪問済み
                </Checkbox>
              </FormControl>
              {isDone && (
                <FormControl id="visitDay">
                  <FormLabel>訪問日</FormLabel>
                  <Input type="date" {...register('visitDay')} />
                </FormControl>
              )}
              <FormControl id="tags">
                <FormLabel>タグ</FormLabel>
                <Box display="flex" gap={2}>
                  <Input
                    type="text"
                    value={tagName}
                    name="tags"
                    onChange={(e) => setTagName(e.target.value)}
                  />
                  <IconButton
                    aria-label="add tag"
                    size="md"
                    icon={<AddIcon />}
                    onClick={() => addTags(tagName)}
                  />
                </Box>
                {tags.length > 0 && tagString !== '' && (
                  <>
                    <Spacer size={10} />
                    <div css={tagWrapper}>
                      {tags.map((tag, index) => (
                        <Tag key={index} paddingRight={0}>
                          <Text paddingRight={1}>{tag}</Text>
                          <IconButton
                            aria-label="delete tag"
                            size="xs"
                            icon={<CloseIcon />}
                            onClick={() => deleteTags(tag)}
                          />
                        </Tag>
                      ))}
                    </div>
                  </>
                )}
              </FormControl>
            </Stack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onSubmit}>
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

const tagWrapper = css`
  display: flex;
  gap: 5px;
`

const error = css`
  color: #c22929;
`
