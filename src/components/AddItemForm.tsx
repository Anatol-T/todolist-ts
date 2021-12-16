import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
  addItem: (text: string)=> void
}

export function AddItemForm({addItem}:PropsType) {
  const [inputTitle, setInputTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value);
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false)
    if (e.key === 'Enter') sendTextHandler()
  }
  const sendTextHandler = () => {
    const trimmedTitle = inputTitle.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
      setInputTitle("");
    } else {
      setInputTitle("")
      setError(true)
    }
  }

  return (
    <div>
      <input value={inputTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      <button onClick={sendTextHandler}>+</button>
      {error && <div className="error-message">Title is required</div>}
    </div>
  )
}