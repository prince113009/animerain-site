export function Input(props) {
  return <input {...props} className={`rounded-lg px-3 py-2 ${props.className}`} />;
}