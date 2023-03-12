import { createSlice } from "@reduxjs/toolkit";

const certificateSlice = createSlice({
  name: "certificate",
  initialState: {
    imgUrl: "",
    selectedText: "",
    inputFocus: false,
    textLayers: [],
    // edit attributes
    nameInEditInput: "",
    // text attributes
    textValue: "",
    textColor: "",
    fontSize: "",
    fontWeight: "",
    fontFamily: "",
    textPos: { x: 0, y: 0 },
    certificateAllowed: true,
  },
  reducers: {
    addImage: (state, action) => {
      const { img } = action.payload;
      state.imgUrl = img;
    },
    addLayer: (state) => {
      const newLayer = {
        id: Math.random(),
        name: "Text",
        val: "XXXXXX",
        fontFamily: "Poppins",
        fontWeight: "400",
        fontSize: "24",
        color: "#000000",
        opacity: "100",
        textPos: { x: 0, y: 0 },
      };
      state.textLayers = [...state.textLayers, newLayer];
    },
    deleteLayer: (state, action) => {
      const id = action.payload;
      const updatedTextLayers = state.textLayers.filter((val) => val.id != id);
      state.textLayers = updatedTextLayers;
    },
    handleLayerClick: (state, action) => {
      const { id, val, color, fontWeight, fontSize, fontFamily } =
        action.payload;
      state.selectedText = id;
      state.textValue = val;
      state.textColor = color;
      state.fontWeight = fontWeight;
      state.fontSize = fontSize;
      state.fontFamily = fontFamily;
    },
    handleEditPenClick: (state, action) => {
      const { id, name } = action.payload;
      state.nameInEditInput = name;
      state.selectedText = id;
      console.log("Edit click change", name);
    },
    setTextLayers: (state, action) => {
      state.textLayers = action.payload;
    },
    changeNameInEditInput: (state, action) => {
      state.nameInEditInput = action.payload;
    },
    setInputFocus: (state, action) => {
      console.log("CHANGED INPUT FOCUS");
      state.inputFocus = !state.inputFocus;
    },
    setNameChangeFromEditInput: (state) => {
      console.log(state.nameInEditInput);
      console.log(state.selectedText);
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == state.selectedText) {
          return {
            id: val.id,
            name: state.nameInEditInput,
            val: val.val,
            fontFamily: val.fontFamily,
            fontWeight: val.fontWeight,
            color: val.color,
            opacity: val.opacity,
            textPos: val.textPos,
          };
        } else {
          return val;
        }
      });
      console.log(updatedTextLayers);
      state.textLayers = updatedTextLayers;
      state.nameInEditInput = "";
    },
    changeTextValue: (state, action) => {
      state.textValue = action.payload;
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == state.selectedText) {
          return {
            id: val.id,
            name: val.name,
            // assing value
            val: action.payload,
            fontFamily: val.fontFamily,
            fontWeight: val.fontWeight,
            fontSize: val.fontSize,
            color: val.color,
            opacity: val.opacity,
            textPos: val.textPos,
          };
        } else {
          return val;
        }
      });
      state.textLayers = updatedTextLayers;
    },
    changeFontSize: (state, action) => {
      state.fontSize = action.payload;
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == state.selectedText) {
          return {
            id: val.id,
            name: val.name,
            val: val.val,
            fontFamily: val.fontFamily,
            fontWeight: val.fontWeight,
            // assing value
            fontSize: action.payload,
            color: val.color,
            opacity: val.opacity,
            textPos: val.textPos,
          };
        } else {
          return val;
        }
      });
      state.textLayers = updatedTextLayers;
    },
    changeFontWeight: (state, action) => {
      state.fontWeight = action.payload;
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == state.selectedText) {
          return {
            id: val.id,
            name: val.name,
            val: val.val,
            fontFamily: val.fontFamily,
            // change
            fontWeight: action.payload,
            fontSize: val.fontSize,
            color: val.color,
            opacity: val.opacity,
            textPos: val.textPos,
          };
        } else {
          return val;
        }
      });
      state.textLayers = updatedTextLayers;
    },
    changeFontFamily: (state, action) => {
      state.fontFamily = action.payload;
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == state.selectedText) {
          return {
            id: val.id,
            name: val.name,
            val: val.val,
            // change
            fontFamily: action.payload,
            fontWeight: val.fontWeight,
            fontSize: val.fontSize,
            color: val.color,
            opacity: val.opacity,
            textPos: val.textPos,
          };
        } else {
          return val;
        }
      });
      state.textLayers = updatedTextLayers;
    },
    changeFontColor: (state, action) => {
      state.textColor = action.payload;
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == state.selectedText) {
          return {
            id: val.id,
            name: val.name,
            val: val.val,
            fontFamily: val.fontFamily,
            fontWeight: val.fontWeight,
            fontSize: val.fontSize,
            // change
            color: action.payload,
            opacity: val.opacity,
            textPos: val.textPos,
          };
        } else {
          return val;
        }
      });
      state.textLayers = updatedTextLayers;
    },
    changeTextPos: (state, action) => {
      const newPos = action.payload[0];
      const id = action.payload[1];
      const updatedTextLayers = state.textLayers.map((val) => {
        if (val.id == id) {
          return {
            id: val.id,
            name: val.name,
            val: val.val,
            fontFamily: val.fontFamily,
            fontWeight: val.fontWeight,
            fontSize: val.fontSize,
            color: val.color,
            opacity: val.opacity,
            // change
            textPos: newPos,
          };
        } else {
          return val;
        }
      });
      // console.log(newPos, id);
      state.textLayers = updatedTextLayers;
    },
    changeCertificateType: (state, action) => {
      state.certificateAllowed = action.payload;
    },
  },
});

export const {
  addImage,
  addLayer,
  deleteLayer,
  handleLayerClick,
  handleEditPenClick,
  setNameChangeFromEditInput,
  setTextLayers,
  changeTextValue,
  changeFontColor,
  changeFontFamily,
  changeFontSize,
  changeFontWeight,
  changeNameInEditInput,
  changeTextPos,
  changeCertificateType,
  setInputFocus,
} = certificateSlice.actions;

export default certificateSlice.reducer;
