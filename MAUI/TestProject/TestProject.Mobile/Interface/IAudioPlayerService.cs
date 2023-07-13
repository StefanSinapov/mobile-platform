namespace TestProject.Mobile.Interface;

internal interface IAudioPlayerService
{
    void PlayAudio(string filePath);
    void Pause();
    void Stop();
    string GetCurrentPlayTime();
    bool CheckFinishedPlayingAudio();
}
