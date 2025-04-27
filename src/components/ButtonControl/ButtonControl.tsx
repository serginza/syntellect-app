import { memo, useState } from "react";
import { ButtonElement, InputElement } from "shared/components";
import { ButtonControlType, ButtonParamsType } from "./ButtonControl.types";
import "./ButtonControl.styles.css";

export type Props = {
  params?: ButtonControlType;
};

function ButtonControlProto({ params }: Props) {
  // хранение состояния через MobX для этого компонента излишне
  const [text, setText] = useState<string>("");

  const renderButton = (btnParams?: ButtonParamsType[]) =>
    btnParams?.map((item) => (
      <ButtonElement key={item.id} onClick={() => item.callback(text, setText)}>
        {item.label}
      </ButtonElement>
    ));

  return (
    <div className="button-control">
      {renderButton(params?.leftButtons)}

      <InputElement
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text field"
      />

      {renderButton(params?.rightButtons)}
    </div>
  );
}

export const ButtonControl = memo(ButtonControlProto);
