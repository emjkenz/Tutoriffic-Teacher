import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SketchPicker } from 'react-color';
import { Form, Input, Button } from 'antd';
import { CREATE_MODULE } from '../../utils/mutations';
import { QUERY_MODULES, QUERY_ME } from '../../utils/queries';
import ModuleList from '../ModuleList';

const Modules = () => {
  const[moduleName, setModuleName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  const { data: myData } = useQuery(QUERY_ME);

  const meData = myData?.me; 
  console.log(meData)

  const [createModule, { error }] = useMutation(CREATE_MODULE, {
    update(cache, { data: { createModule } }) {
      try {
        const { modules } = cache.readQuery({ query: QUERY_MODULES });

        cache.writeQuery({
          query: QUERY_MODULES,
          data: { modules: [...modules, createModule] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleModuleChange = (e) => {
        setModuleName(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };
  
  const handleSave = async () => {
    const dataToSend = { moduleName: moduleName, selectedColor: selectedColor, createdBy:meData._id};
    console.log(dataToSend);

   try {
          const { data } = await createModule({
                variables: { moduleData: dataToSend }
            });

            // Clear form data after successful save
            setModuleName('');
            setSelectedColor('#FFFFFF');
        } catch (error) {
            // Handle error here if needed
            console.error(error);
        }

    console.log(moduleName)
    console.log(selectedColor)
  };

  const { data, loading, refetch } = useQuery(QUERY_MODULES);

  const modules = data?.modules || [];

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        <h2>Modules Page</h2>
        <Form>
                <Form.Item
                    label="Module Name"
                    rules={[
                        {
                            type: 'text',
                        },
                        {
                            required: true,
                            message: 'Please input a Module Name!',
                        },
                    ]}
                >
                    <Input 
                        value={moduleName}
                        onChange={handleModuleChange}
                    />
                </Form.Item>
                <div>
                  What colour would you like the module card to be?
                  <SketchPicker color={selectedColor} onChange={handleColorChange} />
                </div>
                    <Button onClick={handleSave}>Create Module</Button>
            </Form>

             <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ModuleList
                    modules={modules}
                    title="Here's the current list of avilable modules..."
                />
            )}
        </div>
    </div>
  )
};

export default Modules;