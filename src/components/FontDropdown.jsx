import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useFont } from "../context/FontContext";

const FontDropdown = () => {
    const { font, changeFont, fonts } = useFont();

    return (
        <div className="w-72">
            <Select
                value={font}
                onChange={(value) => changeFont(value)}
                label="Select Font"
            >
                {fonts.map((f) => (
                    <Option key={f.name} value={f.family}>
                        {f.name}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default FontDropdown;
