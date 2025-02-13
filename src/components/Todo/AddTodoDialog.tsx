import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../UI/Dialog";
import { Button } from "../../UI/Button";
import AddTodoForm from "./AddTodoForm";
import uuid from "react-uuid";
import { addTodoThunk } from "../../store/todos-slice";
import { reset } from "redux-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..//store/root-store";
import { useState } from "react";

export function AddTodoDialog() {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const submitHandler = ({ title }: { title: string }) => {
    const todo = {
      title,
      isDone: false,
      id: uuid(),
    };

    dispatch(addTodoThunk(todo));
    dispatch(reset("todoForm"));
    setOpen((prev) => !prev);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-2 px-4 rounded-sm bg-amber-300 hover:bg-amber-200">
          Add todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl bg-white p-8">
        <DialogHeader>
          <DialogTitle>Add new todo</DialogTitle>
        </DialogHeader>
        <AddTodoForm handleSubmit={(values) => submitHandler(values)} />
      </DialogContent>
    </Dialog>
  );
}
