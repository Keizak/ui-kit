import React, { ReactElement, useState } from 'react';

import { Control, useForm } from 'react-hook-form';

import { FormElementType } from '../../types/types';

type PropsType<TEntity, TPatch> = {
  name: any;
  value: string | ReactElement;
  updateValue: (entityId: string, model: TPatch) => void;
  editCellFormData?: any;
  editPropName: Extract<keyof TEntity, string> | null | undefined;
  editPropValue: any;
  itemId: any;
};

const CellValueWithControl = <TEntity, TPatch>({
  value,
  itemId,
  updateValue,
  name,
  editCellFormData,
  editPropName,
  editPropValue,
}: PropsType<TEntity, TPatch>) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [val, setVal] = useState<number | string | boolean>();

  const handleSetIsEdit = () => {
    setIsEdit(!isEdit);
  };
  let { register, control } = useForm();

  const handleOnChange = () => {
    //todo function
    if (val && editPropName) {
      updateValue(itemId.toString(), { [editPropName]: val } as any);
    } else {
      if (val && name) {
        updateValue(itemId.toString(), { [name]: val } as any);
      }
    }
    handleSetIsEdit();
  };

  const changeValue = (currentValue: number | string | boolean) => {
    let value: any =
      editCellFormData?.props?.type === 'number' ? +currentValue : currentValue;

    setVal(value);
  };

  let Value: React.FC = () => <div>{value}</div>;

  return (
    <div>
      {isEdit && editCellFormData.editModeComponent ? (
        <form>
          {renderComponent(
            editCellFormData,
            editPropValue ? editPropValue : value,
            register,
            handleOnChange,
            changeValue,
            control
          )}
        </form>
      ) : (
        <div onDoubleClick={handleSetIsEdit} style={{ cursor: 'pointer' }}>
          <Value />
        </div>
      )}
    </div>
  );
};

export default CellValueWithControl;

export function renderComponent<T>(
  editCellFormData: FormElementType<T>,
  value: any,
  register: any,
  handleOnChange: () => void,
  changeValue: (currentValue: number | string | boolean) => void,
  control: Control
) {
  let ElementComponent = editCellFormData.editModeComponent as React.FC;

  const registeredObj = register(editCellFormData.name);

  return (
    <ElementComponent
      defaultValue={value}
      {...registeredObj}
      control={control}
      handleOnChange={(currentValue: number | string | boolean) => {
        changeValue(currentValue);
      }}
      onBlur={handleOnChange}
    />
  );
}
