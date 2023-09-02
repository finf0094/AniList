import { Modal, Text } from "@/components";

const ModalComponent: React.FC<any> = ({ data, title, isOpen, onClose }) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title}>
      {data}
    </Modal>
  );
};

export default ModalComponent;