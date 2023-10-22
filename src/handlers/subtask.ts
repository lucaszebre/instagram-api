import prisma  from "../db"

export const getSubTask= async (req, res) => {
  try {
    const subtask = await prisma.subtask.findUnique({
      where: { id: req.params.id }
    });
    if (!subtask) {
      return res.status(404).json({ error: 'Subtask not found' });
    }
    res.json(subtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createSubTask = async (req, res) => {
  try {
    const newSubtask = await prisma.subtask.create({
      data: req.body
    });
    res.json(newSubtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const updateSubTask = async (req, res) => {
  
  try {
    const updatedSubtask = await prisma.subtask.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(updatedSubtask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteSubtask = async (req, res) => {
  try {
    await prisma.subtask.delete({
      where: { id: req.params.id }
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

