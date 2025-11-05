interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return;

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-xs flex justify-center items-center z-50 transition-all duration-300"
      onClick={handleOutsideClick}
    >
      <div className="bg-gray-900 rounded-xl w-[600px] p-8">{children}</div>
    </div>
  );
};

export default Modal;
