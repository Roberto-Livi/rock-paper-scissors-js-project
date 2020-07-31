class LeaderboardSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :score
end