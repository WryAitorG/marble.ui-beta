interface PreviewProps {
  component: React.ReactNode;
  isVisible: boolean;
}

const Preview: React.FC<PreviewProps> = ({ component, isVisible }) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full bg-white border border-gray-200 rounded-xl ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full h-full overflow-auto flex items-start justify-center"
      style={{
        scrollbarWidth: 'thin', // Soporte para Firefox
        scrollbarColor: 'grey transparent', // Color del scrollbar en Firefox
      }}>
        <div className="w-full max-w-full">{component}</div>
      </div>
    </div>
  );
};

export default Preview;
