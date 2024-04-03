import { ChangeEvent, FormEvent, useState } from 'react';

type Box = { width: number; height: number; backgroundColor: string };

const NewBoxForm = ({ addBox }: { addBox: (box: Box) => void}) => {
    const INITIAL_STATE = { width: 100, height: 100, backgroundColor: "green"};
    const [formData, setFormData] = useState(INITIAL_STATE);
  
    /** Send {width, height, color} to parent & clear form. */
    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      addBox(formData);
      setFormData(INITIAL_STATE);
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const { name, value }= evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };
  
    /** render form */
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="width">Width:</label>
        <input
          type="number"
          id="width"
          name="width"
          value={formData.width}
          onChange={handleChange}
        />

        <label htmlFor="height">Height:</label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
        />
  
        <label htmlFor="backgroundColor">Color:</label>
        <input
          id="backgroundColor"
          name="backgroundColor"
          value={formData.backgroundColor}
          onChange={handleChange}
        />
  
        <button>Add a new box!</button>
      </form>
    );
};

export default NewBoxForm;