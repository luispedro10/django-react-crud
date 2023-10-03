import { useForm } from "react-hook-form";
import { createTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useEffect } from "react";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm(); //para poder registrar inputs

  const navigate = useNavigate();
  const params = useParams();
  

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data)
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });

  useEffect(()=>{
    async function loadTask (){
      if(params.id){
        const res = await getTask(params.id)
        setValue('title', res.data.title)
        setValue('description', res.data.description)
      }
    }
    loadTask()
  }, [])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })} //lo registramos como title
        />
        {errors.title && <span>titulo es requerido</span>}

        <textarea
          rows="3"
          placeholder="description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>descripcion es requerida</span>}
        <button>Save</button>
      </form>

      {params.id && (
        <button
          onClick={async () => {
            const accepted = window.confirm(
              "Seguro que quieres borrar la tarea?"
            );
            if (accepted) {
              await deleteTask(params.id);
              navigate("/tasks");
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default TaskFormPage;
