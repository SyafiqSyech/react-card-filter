
const Card = (props: { title : any, content : any, attribute : any, color : any }) => {
  return (
    <div className={`bg-white rounded-3xl overflow-hidden max-w-sm hover:bg-stone-100 hover:cursor-pointer ease-in-out duration-200`}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
        <div className="text-xs text-gray-600 flex gap-2 justify-center mb-2">
          {props.attribute.map((attr : any) => (
            <p className="px-3 py-1 rounded-full bg-gray-200">{ attr }</p>
          ))}
        </div>
        <p className="text-gray-600">{props.content}</p>
      </div>
    </div>
  )
}

export default Card