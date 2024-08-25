import { createSlice } from "@reduxjs/toolkit";
import { downloadFile } from "../utils/base64";

const loadData = () => {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    return JSON.parse(savedData);
  }

  return [
    {
      id: "1",
      title: "one for all",
      numberOfItems: 0,
      items: [],
    },
  ];
};

const initialState = {
  modules: loadData(),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action) => {
      const newModule = {
        id: action.payload.id,
        title: action.payload.title,
        numberOfItems: 0,
        items: [],
      };
      state.modules.push(newModule);
      saveData(state.modules);
    },
    updateModule: (state, action) => {
      const moduleIndex = state.modules.findIndex(
        (module) => module.id === action.payload.id
      );
      if (moduleIndex !== -1) {
        state.modules[moduleIndex] = {
          ...state.modules[moduleIndex],
          title: action.payload.title,
        };
        saveData(state.modules);
      }
    },
    updateModuleItem: (state, action) => {
      const moduleIndex = state.modules.findIndex(
        (module) => module.id === action.payload.idModule
      );
      if (moduleIndex !== -1) {
        const itemIndex = state.modules[moduleIndex].items.findIndex(
          (item) => item.id === action.payload.idItem
        );
        if (itemIndex !== -1) {
          state.modules[moduleIndex].items[itemIndex].title =
            action.payload.title;
          if (action.payload.url?.length > 0) {
            state.modules[moduleIndex].items[itemIndex].fileName =
              action.payload.url;
          }
        }
        saveData(state.modules);
      }
    },
    deleteModule: (state, action) => {
      const filteredModules = state.modules.filter(
        (module) => module.id !== action.payload
      );
      saveData(filteredModules);
      return {
        ...state,
        modules: filteredModules,
      };
    },
    deleteModuleItem: (state, action) => {
      const idItem = action.payload.idItem;
      const moduleIndex = state.modules.findIndex(
        (module) => module.id === action.payload.moduleId
      );
      if (moduleIndex !== -1) {
        const updatedItems = state.modules[moduleIndex].items.filter(
          (item) => item.id !== idItem
        );
        state.modules[moduleIndex].items = updatedItems;
        state.modules[moduleIndex].numberOfItems = updatedItems.length;
        saveData(state.modules);

        console.log("Updated State:", state.modules);
      }
    },
    reorderModules: (state, action) => {
      state.modules = action.payload;
      saveData(action.payload);
    },
    addItemIndividual: (state, action) => {
      console.log(action.payload);
      const item = action.payload;
      const module = state.modules.find((mod) => mod.id === "1");
      if (module) {
        console.log(item);
        module.items.push(item);
        module.numberOfItems = module.items.length;
        saveData(state.modules);
      }
    },
    removeItem: (state, action) => {
      const { moduleId, itemId } = action.payload;
      const module = state.modules.find((mod) => mod.id === moduleId);
      if (module) {
        module.items = module.items.filter((item) => item.id !== itemId);
        module.numberOfItems = module.items.length;
        saveData(state.modules);
      }
    },
    downloadSingleFile: (state, action) => {
      console.log(action.payload);
      const idItem = action.payload.idItem;
      const moduleIndex = state.modules.findIndex(
        (module) => module.id === action.payload.idModule
      );
      if (moduleIndex !== -1) {
        const item = state.modules[moduleIndex].items.find(
          (item) => item.id === idItem
        );
        const fileName = item.fileName;
        const filetype = item.filetype;
        const base64 = localStorage.getItem(item.fileName);

        downloadFile(fileName, base64, filetype);
      }
    },
    clearAll: (state) => {
      state.modules = [
        {
          id: 1,
          title: "one for all",
          numberOfItems: 0,
          items: [],
        },
      ];
      saveData(state.modules);
    },
  },
});

const saveData = (modules) => {
  localStorage.setItem("data", JSON.stringify(modules));
};

export const {
  addModule,
  addItemIndividual,
  removeItem,
  updateModule,
  clearAll,
  reorderModules,
  deleteModule,
  updateModuleItem,
  deleteModuleItem,
  downloadSingleFile,
} = modulesSlice.actions;

export default modulesSlice.reducer;
