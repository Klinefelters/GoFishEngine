import { Modal, ModalOverlay, ModalContent, Flex, Button,} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ResetButton from './settings-elements/ResetButton'
// import Logo from './game-elements/Logo'

export default function GameOver({ isOpen, onClose, open, summary, welcomeOpen }) {
    const [lines, setLines] = useState(["Game Over"])
    useEffect(() => {
        if (summary.seat === -1){
            open()
            let temp = [""]
            const winningPlayerIndex = summary.counts.indexOf(Math.max(...summary.counts)) + 1
            temp.push(`Player ${winningPlayerIndex} won!`)
            for (let i = 0; i < summary.counts.length; i++){
                temp.push(`Player ${i+1}: ${summary.counts[i]} points`)
            }
            setLines(temp)
        }
    }, [summary])

    const handleClose = () => {
        onClose()
        welcomeOpen()
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent 
                bg="rgba(0,0,0,0.5)" 
                backdropFilter="blur(10px)" 
                p="10px"
                top={`${window.innerHeight/2-300}px`}
                borderRadius={"2xl"}
            >
                <Flex direction="column" justifyContent="center" alignItems="center" h="300px">
                    {lines.map((line, index) => <p key={index}>{line}</p>)}
                    <Flex h="10px" m="10px" textColor={"white"}>
                        <ResetButton />
                        <Button ml="10px"onClick={handleClose}>Close</Button>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}