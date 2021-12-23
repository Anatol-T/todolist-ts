import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";

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
      <TextField id="outlined-basic" label="Add item" variant="outlined" size="small"
                 style={{width: "200px"}}
                 error={error}
                 value={inputTitle}
                 helperText={error && "Title is required"}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
      />
      {/*<input value={inputTitle}*/}
      {/*       onChange={onChangeHandler}*/}
      {/*       onKeyPress={onKeyPressHandler}*/}
      {/*       className={error ? "error" : ""}*/}
      {/*/>*/}
      <IconButton onClick={sendTextHandler} size="small" color="primary">
        < AddCircleOutline />
      </IconButton>
      {/*<button onClick={sendTextHandler}>+</button>*/}
      {/*{error && <div className="error-message">Title is required</div>}*/}
    </div>
  )
}