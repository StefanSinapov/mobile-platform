using CommunityToolkit.Maui.Maps;
using Microsoft.Extensions.Logging;

namespace TestProject.Mobile;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			})
			.UseMauiMaps()
            .UseMauiCommunityToolkitMaps("AjaH4pysyepDDi4Fx9TuXUBj_1rjrkvuoBxDB5oZhRuB6ahQ2TrOv4qkn46qnpGa");

#if DEBUG
		builder.Logging.AddDebug();
#endif

		return builder.Build();
	}
}
