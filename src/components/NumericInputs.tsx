type InputId = string;

export interface NumericInputConfig<T extends InputId = InputId> {
  id: T;
  label: string;
  step: string;
}

export interface NumericInputFieldProps<T extends InputId = InputId>
  extends NumericInputConfig<T> {
  value: number;
  onValueChange: (id: T, value: string) => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function NumericInputField<T extends InputId>({
  id,
  label,
  step,
  value,
  onValueChange,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
}: NumericInputFieldProps<T>) {
  return (
    <div className={containerClassName}>
      <label htmlFor={id}>
        <h3 className={labelClassName}>{label}</h3>
      </label>
      <input
        className={inputClassName}
        id={id}
        type="number"
        step={step}
        onChange={(evt) => onValueChange(id, evt.target.value)}
        value={value}
      />
    </div>
  );
}

export interface NumericInputGroupProps<T extends InputId = InputId> {
  values: Record<T, number>;
  config: NumericInputConfig<T>[];
  onValueChange: (id: T, value: string) => void;
  containerClassName?: string;
  fieldClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export function NumericInputGroup<T extends InputId>({
  values,
  config,
  onValueChange,
  containerClassName = "",
  fieldClassName = "",
  labelClassName = "",
  inputClassName = "",
}: NumericInputGroupProps<T>) {
  return (
    <div className={containerClassName}>
      {config.map((field) => (
        <NumericInputField
          key={field.id}
          {...field}
          value={values[field.id]}
          onValueChange={onValueChange}
          containerClassName={fieldClassName}
          labelClassName={labelClassName}
          inputClassName={inputClassName}
        />
      ))}
    </div>
  );
}
