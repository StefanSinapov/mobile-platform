using Microsoft.Maui.Controls.Maps;
using Microsoft.Maui.Maps;
using System.Diagnostics;
using TestProject.Mobile.ViewModels;

namespace TestProject.Mobile.Views;

public partial class MapPage : ContentPage
{
    private CancellationTokenSource _cancelTokenSource;
    private Location _officeLocation = new Location(42.683381890105764, 23.35473960346132);

    public MapPage()
    {
        InitializeComponent();
        BindingContext = new PinItemsSourcePageViewModel();
        map.MoveToRegion(MapSpan.FromCenterAndRadius(_officeLocation, Distance.FromKilometers(10)));
        map.Pins.Add(new Pin
        {
            Type = PinType.Place,
            Label = "DextraSoft",
            Address = "Sofia, Bulgaria",
            Location = _officeLocation
        });
    }

    void OnButtonClicked(object sender, EventArgs e)
    {
        Button button = sender as Button;
        switch (button.Text)
        {
            case "Street":
                map.MapType = MapType.Street;
                break;
            case "Satellite":
                map.MapType = MapType.Satellite;
                break;
            case "Hybrid":
                map.MapType = MapType.Hybrid;
                break;
        }
    }

    void OnMapClicked(object sender, MapClickedEventArgs e)
    {
        Debug.WriteLine($"MapClick: {e.Location.Latitude}, {e.Location.Longitude}");

        var pin = new Pin
        {
            Type = PinType.Generic,
            Location = e.Location,
            Label = "Pin",
            Address = $"Pin Address {e.Location.Latitude}, {e.Location.Longitude}"
        };
        map.Pins.Add(pin);
    }

    void OnGoToOffice(object sender, EventArgs e)
    {
        map.MoveToRegion(MapSpan.FromCenterAndRadius(_officeLocation, Distance.FromMeters(200)));
    }

    private async void GetCurrentLocationButton_Clicked(object sender, EventArgs e)
    {
        try
        {
            GeolocationRequest request = new(GeolocationAccuracy.Best, TimeSpan.FromSeconds(10));

            _cancelTokenSource = new CancellationTokenSource();

            Location location = await Geolocation.Default.GetLocationAsync(request, _cancelTokenSource.Token);

            if (location != null)
            {
                Debug.WriteLine($"Latitude: {location.Latitude}, Longitude: {location.Longitude}, Altitude: {location.Altitude}");

                map.Pins.Add(new Pin
                {
                    Type = PinType.SavedPin,
                    Label = "Current Location",
                    Location = location
                });

                map.MoveToRegion(mapSpan: MapSpan.FromCenterAndRadius(location, Distance.FromKilometers(1)));
            }
        }
        // Catch one of the following exceptions:
        //   FeatureNotSupportedException
        //   FeatureNotEnabledException
        //   PermissionException
        catch (Exception ex)
        {
            // Unable to get location
            Debug.WriteLine($"Unable to get location: {ex.Message}");
        }
    }


    private async void OpenMapApp(object sender, EventArgs e)
    {
        var options = new MapLaunchOptions { Name = "Dextrasoft" };

        try
        {
            await Microsoft.Maui.ApplicationModel.Map.Default.OpenAsync(_officeLocation, options);
        }
        catch (Exception ex)
        {
            // No map application available to open
            Debug.WriteLine("Failed to Open Map: " + ex.Message);
        }
    }
}