const ExampleComponent = (props) => {
  return (
    <div className="flex items-center content-center justify-center h-dvh w-dvw">
      <div className="p-5 rounded-lg shadow-xl hover:bg-gray-200 bg-gray-50">
        {props.title}
      </div>
    </div>
  );
};

export default ExampleComponent;
