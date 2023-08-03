import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SketchPicker } from 'react-color';
import { Form, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { CREATE_MODULE } from '../../utils/mutations';
import { QUERY_MODULES, QUERY_ME } from '../../utils/queries';
import ModuleList from '../ModuleList';

const Modules = () => {
  const [moduleName, setModuleName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [errors, setErrors] = useState({});

  const { data: myData } = useQuery(QUERY_ME);
  const meData = myData?.me;
  console.log(meData);

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
    // Perform form validation before saving the module
    const validationErrors = {};
    if (!moduleName.trim()) {
      validationErrors.moduleName = 'Module name is required.';
    }
    if (!selectedColor) {
      validationErrors.selectedColor = 'Module color is required.';
    }

    // If there are validation errors, display them and prevent saving the module
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSend = { moduleName: moduleName, selectedColor: selectedColor, createdBy: meData._id };
    console.log(dataToSend);

    try {
      const { data } = await createModule({
        variables: { moduleData: dataToSend }
      });

      // Clear form data after successful save
      setModuleName('');
      setSelectedColor('#FFFFFF');
      setErrors({});
    } catch (error) {
      // Handle error here if needed
      console.error(error);
    }
  };

  const { data, loading, refetch } = useQuery(QUERY_MODULES);
  const modules = data?.modules || [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const styles = {
    moduleBox: {
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      textAlign: 'center',
      zIndex: 1, // Add a higher z-index value
    },
    button: {
      backgroundColor: "#e67e22",
      color: "#fff",
      boxShadow: '2px 2px 10px rgb(216, 215, 215)',
      marginTop: '10px',
    },
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', marginTop: '64px' }}>
      {/* Add a margin-top to create space between the navbar and the module content */}
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={styles.moduleBox}>
          <h2>Modules Page</h2>
          <Form>
            <Form.Item
              label="Module Name"
              rules={[
                {
                  required: true,
                  message: 'Please input a Module Name!',
                },
              ]}
              validateStatus={errors.moduleName ? 'error' : ''}
              help={errors.moduleName}
            >
              <Input value={moduleName} onChange={handleModuleChange} />
            </Form.Item>
            <div>
              What colour would you like the module card to be?
              <SketchPicker color={selectedColor} onChange={handleColorChange} />
              {errors.selectedColor && <span style={{ color: 'red' }}>{errors.selectedColor}</span>}
            </div>
            <Button onClick={handleSave} style={styles.button}>Create Module</Button>
          </Form>

          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ModuleList modules={modules} title="Here's the current list of available modules..." />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Modules;



