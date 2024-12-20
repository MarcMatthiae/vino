export const HorizontalList = ({ items }: { items?: string[] }) => {
  return (
    <p>
      {items?.map((item, index) => (
        <span key={index}>
          {item}
          {index < items.length - 1 && <span className="dot"> · </span>}
        </span>
      ))}
    </p>
  );
};
