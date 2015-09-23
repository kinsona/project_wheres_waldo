class TagsController < ApplicationController

  def create
    @tag = Tag.new
    @tag.image = Image.first
    @tag.player = Player.first
    @tag.x = params[:x]
    @tag.y = params[:y]
    @tag.character = Character.find_by_name(params[:character])

    if @tag.save
      tag_data = JSON.parse(@tag.to_json)
      tag_data["character_name"] = @tag.character.name

      respond_to do |format|
        format.json { render :json => tag_data, :status => :created }
      end
    else

      respond_to do |format|
        format.json { render :nothing => true, :status => :unprocessable_entity }
      end
    end

  end


end