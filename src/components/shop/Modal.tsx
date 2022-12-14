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
import { useDevice } from '@/hooks/use-device'
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
  const { isMobile } = useDevice()
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
        <ModalHeader>Shop???????????????</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex align={'center'}>
            <Stack spacing={2} width="100%">
              <FormControl id="name" isRequired>
                <FormLabel>???????????????</FormLabel>
                <Input
                  type="text"
                  {...register('name', {
                    required: {
                      value: true,
                      message: '?????????????????????????????????',
                    },
                    maxLength: {
                      value: 20,
                      message: '20??????????????????????????????????????????',
                    },
                  })}
                />
                {errors?.name && <p css={error}>{errors.name.message}</p>}
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>??????</FormLabel>
                <Textarea
                  rows={7}
                  {...register('description', {
                    required: {
                      value: true,
                      message: '?????????????????????????????????',
                    },
                    maxLength: {
                      value: 200,
                      message: '200??????????????????????????????????????????',
                    },
                  })}
                />
                {errors?.description && (
                  <p css={error}>{errors.description.message}</p>
                )}
              </FormControl>
              <FormControl id="url">
                <FormLabel>??????URL</FormLabel>
                <Input
                  type="text"
                  {...register('url', {
                    pattern: {
                      // eslint-disable-next-line no-useless-escape
                      value: /^(https?|ftp)(:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+)/,
                      message: '?????????URL???????????????????????????',
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
                  ????????????
                </Checkbox>
              </FormControl>
              {isDone && (
                <FormControl id="visitDay">
                  <FormLabel>?????????</FormLabel>
                  <Input type="date" {...register('visitDay')} />
                </FormControl>
              )}
              <FormControl id="tags">
                <FormLabel>??????</FormLabel>
                <Box display="flex" gap={2}>
                  <Input
                    type="text"
                    value={tagName}
                    name="tags"
                    onChange={(e) => setTagName(e.target.value)}
                  />
                  <IconButton
                    aria-label="add tag"
                    icon={<AddIcon />}
                    onClick={() => addTags(tagName)}
                  />
                </Box>
                {tags.length > 0 && tagString !== '' && (
                  <>
                    <Spacer size={isMobile ? 5 : 10} />
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
          <Button
            size={isMobile ? 'sm' : 'md'}
            colorScheme="teal"
            mr={3}
            onClick={onSubmit}
          >
            {isEdit ? '????????????' : '????????????'}
          </Button>
          <Button
            size={isMobile ? 'sm' : 'md'}
            colorScheme="blue"
            onClick={onClose}
          >
            ??????
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
