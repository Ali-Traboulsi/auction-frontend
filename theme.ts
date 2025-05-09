export const theme = {
  checkbox: {
    defaultProps: {
      color: "auc-primary-color",
    },
    valid: {
      colors: ["auc-primary-color"],
    },
    styles: {
      base: {
        input: {
          borderColor: "border-auc-primary-color",
        },
        label: {
          textTransform: "capitalize",
        },
        icon: {
          color: "text-auc-primary-color",
        },
      },
      colors: {
        "auc-primary-color": {
          background: "checked:bg-white",
          border: "checked:border-auc-primary-color",
          before: "checked:before:bg-auc-primary-color",
        },
      },
    },
  },
  drawer: {
    defaultProps: {
      size: 300,
      overlay: true,
      placement: "left",
      overlayProps: undefined,
      className: "",
      dismiss: undefined,
      onClose: undefined,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    styles: {
      base: {
        drawer: {
          position: "fixed",
          zIndex: "z-[9999]",
          pointerEvents: "pointer-events-auto",
          backgroundColor: "bg-white",
          boxSizing: "box-border",
          width: "w-full",
          boxShadow: "shadow-2xl shadow-blue-gray-900/10",
        },
        overlay: {
          position: "fixed",
          inset: "inset-0",
          width: "w-full",
          height: "h-full",
          pointerEvents: "pointer-events-auto",
          zIndex: "z-[9995]",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropBlur: "backdrop-blur-sm",
        },
      },
    },
  },
};
