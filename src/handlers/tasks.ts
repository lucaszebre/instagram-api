import prisma  from "../db"

export const updateTaskSubtask = async (req, res) => {
  const { id } = req.params;
  const { updatedTask, subtasksAdd, subtasksChangeName, subtasksToDelete } = req.body;

  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: { subtasks: true },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (subtasksToDelete && subtasksToDelete.length > 0) {
      await prisma.subtask.deleteMany({
        where: {
          id: { in: subtasksToDelete },
        },
      });
    }

    if (subtasksChangeName && subtasksChangeName.length > 0) {
      const updateSubtasksPromises = subtasksChangeName.map((subtask) =>
        prisma.subtask.update({
          where: { id: subtask.id },
          data: { title: subtask.title },
        })
      );
      await Promise.all(updateSubtasksPromises);
    }

    if (subtasksAdd && subtasksAdd.length > 0) {
      const addSubtasksPromises = subtasksAdd.map((title) =>
        prisma.subtask.create({
          data: {
            title,
            task: { connect: { id } },
          },
        })
      );
      await Promise.all(addSubtasksPromises);
    }

    const updatedTaskResult = await prisma.task.update({
      where: { id },
      data: updatedTask,
    });

    res.json(updatedTaskResult);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTask= async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task
    const Deletedtask = await prisma.task.delete({
      where: { id },
      include: { subtasks: true },
    });

    res.json(Deletedtask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
 
}
export const getTask= async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task
    const task = await prisma.task.findUnique({
      where: { id },
      include: { subtasks: true },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
 
}

export const moveTaskToColumn = async (req, res) => {
  const { id, columnId } = req.params;

  try {
    // Check if task and new column exist
    const [existingTask, newColumn] = await Promise.all([
      prisma.task.findUnique({ where: { id: id} }),
      prisma.column.findUnique({ where: { id: columnId } }),
    ]);

    if (!existingTask) {
      return res.status(404).send('Task not found');
    }

    if (!newColumn) {
      return res.status(404).send('Column not found');
    }

    // If task and column exist, update the task's columnId
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: {
        column: {
          connect: { id: columnId },
        },
      },
      include: {
        subtasks: true, // Include related subtasks in the response
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send(error.message);
  }
};

