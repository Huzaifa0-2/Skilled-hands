export default function page() {
  return (
    <div className="container mx-auto mt-10 p-8 px-[6rem]">
      <p className="text-3xl font-bold mb-[3rem]">Contact Us</p>
      <p className="mb-4">
        Feel free to reach out to us using the contact details below:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl font-semibold mb-4">Email</p>
          <p>development.masood@gmail.com</p>
        </div>
        <div>
          <p className="text-xl font-semibold mb-4">Phone</p>
          <p>+92 3190979606</p>
        </div>
      </div>
    </div>
  );
}
