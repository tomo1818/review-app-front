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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react'

type Props = {
  params: {
    title: string
    shopId: number
    comment: string
    score: number
  }
  handleChange: (name: string, val: string | number) => void
  handleSubmit: () => void
  isOpen: boolean
  onClose: () => void
}

export const FormModal: React.FC<Props> = ({
  params,
  handleChange,
  handleSubmit,
  isOpen,
  onClose,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>レビューを追加する</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex align={'center'}>
            <Stack spacing={2} width="100%">
              <FormControl id="name" isRequired>
                <FormLabel>タイトル</FormLabel>
                <Input
                  type="text"
                  value={params.title}
                  name="title"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </FormControl>
              <FormControl id="comment" isRequired>
                <FormLabel>コメント</FormLabel>
                <Textarea
                  value={params.comment}
                  name="comment"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </FormControl>
              <FormControl id="score" isRequired>
                <FormLabel>評価</FormLabel>
                <NumberInput
                  name="score"
                  value={params.score}
                  min={0}
                  max={5}
                  onChange={(e) => handleChange('score', Number(e))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Stack>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            追加する
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            戻る
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
