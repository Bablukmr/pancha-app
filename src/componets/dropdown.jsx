import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selected, theme) {
  return {
    fontWeight:
      selected === ""
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CustomDropdown({
  data,
  loading,
  placeholder,
  handleChange,
  selected,
  toShow,
}) {
  const theme = useTheme();

  return (
    <div>
      <FormControl sx={{ width: "100%", mt: 2 }}>
        <Select
          sx={{
            // height: '2.5rem',
            color: "#262626",
            "&.MuiOutlinedInput-notchedOutline": {
              borderColor: "#262626",
            },
            "&.MuiSvgIcon-root": {
              color: "#262626",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#262626",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#262626",
              borderWidth: "thin",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#262626",
              borderWidth: "thin",
            },
          }}
          displayEmpty
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected === "") {
              return <em>{placeholder}</em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {loading ? (
            <MenuItem disabled value="">
              <em>Loading ...</em>
            </MenuItem>
          ) : (
            data?.map((d) => (
              <MenuItem
                key={d.id}
                value={d[toShow]}
                style={getStyles(d[toShow], selected, theme)}
              >
                {d[toShow]}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}
