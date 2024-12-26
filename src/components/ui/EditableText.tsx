import { useState } from "react";

interface EditableTextProps {
  content: string;
  onUpdate: (text: string) => void;
  className?: string;
  classNameText?: string;
  classNameInput?: string;
}
const EditableText = ({
  content,
  onUpdate,
  className,
  classNameText,
  classNameInput,
}: EditableTextProps) => {
  const [text, setText] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  // Active le mode édition
  const handleTextClick = () => setIsEditing(true);

  // Gère la saisie dans l'input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  // Sauvegarde la modification et désactive le mode édition
  const handleSave = () => {
    setIsEditing(false);
    onUpdate(text);
  };

  // Sauvegarde lorsque l'utilisateur appuie sur Entrée
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className={className}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleSave} // Sauvegarde lors du blur
          onKeyDown={handleKeyDown} // Sauvegarde avec Entrée
          autoFocus
          className={`p-0 ${classNameInput}`}
        />
      ) : (
        <span onClick={handleTextClick} className={`p-0 ${classNameText}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableText;
