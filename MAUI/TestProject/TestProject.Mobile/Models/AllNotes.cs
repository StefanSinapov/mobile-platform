
using System.Collections.ObjectModel;

namespace TestProject.Mobile.Models;

internal class AllNotes
{
    public ObservableCollection<Note> Notes { get; set; } = new ObservableCollection<Note>();

    public AllNotes() =>
        LoadNotes();

    public void LoadNotes()
    {
        Notes.Clear();

        // Get the folder where the notes are stored;
        string appDataPath = FileSystem.AppDataDirectory;

        var notes = Directory.EnumerateFiles(appDataPath, "*.notes.txt")
                .Select(filename => new Note
                {
                    FileName = filename,
                    Text = File.ReadAllText(filename),
                    Date = File.GetCreationTime(filename)
                })
                .OrderBy(x => x.Date);

        foreach (var note in notes)
        {
            Notes.Add(note);
        }
    }
}
