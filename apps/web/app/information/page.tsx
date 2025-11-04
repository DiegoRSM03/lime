import Image from 'next/image';

const Information = () => {
  return (
    <main className="px-6 py-10 bg-gray-900 text-white h-full">
      <h1 className="text-2xl font-bold">Information</h1>
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src="/images/lime-workflow-whiteboard.png"
          alt="Home"
          width={4338 / 3}
          height={2005 / 3}
          className="w-max h-auto object-cover aspect-4338/2005 rounded-lg"
        />
      </div>
    </main>
  );
};

export default Information;
