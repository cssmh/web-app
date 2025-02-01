const Guide = () => {
  const steps = [
    {
      title: "Getting Started",
      description: "Welcome to BlogApp! Follow these steps to get started:",
      points: [
        "Create an account or log in if you already have one.",
        "Navigate to the 'Write Blog' page to start creating your first blog.",
        "Fill in the blog title, content, category, tags, and image URL.",
        "Click 'Create Blog' to publish your post.",
      ],
    },
    {
      title: "Writing a Blog",
      description: "Here are some tips for writing a great blog:",
      points: [
        "Choose a catchy and descriptive title.",
        "Use clear and concise language.",
        "Add relevant tags to make your blog easier to find.",
        "Include a high-quality image to make your blog visually appealing.",
      ],
    },
    {
      title: "Editing a Blog",
      description: "Need to make changes to your blog? Here's how:",
      points: [
        "Go to 'My Blogs' to view all your published blogs.",
        "Click the 'Edit' button on the blog you want to update.",
        "Make your changes and click 'Update Blog' to save.",
      ],
    },
    {
      title: "Managing Comments",
      description: "Engage with your readers by managing comments:",
      points: [
        "View comments on your blog by navigating to the blog details page.",
        "Reply to comments to interact with your audience.",
        "Edit or delete your own comments if needed.",
      ],
    },
    {
      title: "Tips for Success",
      description:
        "Follow these tips to grow your audience and improve your blogging skills:",
      points: [
        "Post regularly to keep your audience engaged.",
        "Promote your blogs on social media.",
        "Engage with other bloggers by reading and commenting on their posts.",
        "Use analytics to track your blog's performance.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto text-white p-2 md:p-6 shadow-md rounded-2xl">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        Guide to Using BlogApp
      </h2>
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-4 border-l-4 border-blue-500 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold text-white">
              {index + 1}. {step.title}
            </h3>
            <p className="text-gray-300 mb-2">{step.description}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {step.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
