export default function UserDashboardStatistic({
    success,
    games,
    rank,
}: {
    success: number | undefined;
    games: number | undefined;
    rank: number | undefined;
}) {
    return (
        <>
            <h2 className="font-title text-retro-accent text-3xl mb-5 flex-wrap sm:flex items-center">
                Statistiques
            </h2>

            <section className="grid grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6 mb-8">
                <div className="col-span-3 card-primary-hover p-6">
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">🎮</div>
                        <h3 className="font-righteous text-retro-accent uppercase mb-2">
                            Parties gagnées
                        </h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        {success}
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        {success && games && `Il t'en reste ${games - success}`}
                    </div>
                </div>

                <div className="col-span-3 card-primary-hover p-6">
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">✓</div>
                        <h3 className="font-righteous text-retro-accent uppercase mb-2">
                            Taux de réussite
                        </h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        {success &&
                            games &&
                            ((success / games) * 100).toFixed(0)}
                        %
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        {success &&
                            games &&
                            (parseInt(((success / games) * 100).toFixed(0)) >=
                            90
                                ? 'Machine de guerre'
                                : parseInt(
                                        ((success / games) * 100).toFixed(0)
                                    ) >= 75
                                  ? 'Champion·ne'
                                  : parseInt(
                                          ((success / games) * 100).toFixed(0)
                                      ) >= 50
                                    ? "Y'a du potentiel"
                                    : 'Courage, ça va venir')}
                    </div>
                </div>

                <div className="col-span-3 card-primary-hover p-6">
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">🔝</div>
                        <h3 className="font-righteous text-retro-accent uppercase mb-2">
                            Classement
                        </h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        {rank}
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        {rank &&
                            (rank <= 3
                                ? 'Légende Vivante'
                                : rank <= 10
                                  ? 'Point faible, trop fort·e'
                                  : rank <= 20
                                    ? 'Aux portes du top'
                                    : 'Prometteur')}
                    </div>
                </div>

                <div className="col-span-3 card-primary p-6 opacity-30 cursor-not-allowed">
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-4xl mb-4">⚡</div>
                        <h3 className="font-righteous text-retro-accent uppercase mb-2">
                            Meilleure série
                        </h3>
                    </div>
                    <div className="text-4xl sm:text-5xl font-title text-retro-primary [text-shadow:0_0_10px_rgba(255,0,110,0.5)]">
                        7
                    </div>
                    <div className="text-retro-muted text-xs uppercase tracking-wide mt-2">
                        Victoires
                    </div>
                </div>
            </section>
        </>
    );
}
